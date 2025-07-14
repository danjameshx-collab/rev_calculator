import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const SaleEntriesTable = ({ currentUser }) => {
  const [salesData, setSalesData] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Load sales data from localStorage
  useEffect(() => {
    if (currentUser) {
      const salesKey = `sales_${currentUser.username || 'default'}`;
      const existingSales = JSON.parse(localStorage.getItem(salesKey) || '[]');
      setSalesData(existingSales);
    }
  }, [currentUser]);

  // Sort the data
  const sortedData = [...salesData].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    if (sortBy === 'revenue' || sortBy === 'cashCollected') {
      const aVal = parseFloat(a[sortBy]) || 0;
      const bVal = parseFloat(b[sortBy]) || 0;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleDeleteSale = (timestamp) => {
    setDeleteConfirm(timestamp);
  };

  const confirmDelete = () => {
    const timestampToDelete = deleteConfirm;
    if (!timestampToDelete || !currentUser) return;

    const salesKey = `sales_${currentUser.username || 'default'}`;
    const updatedSales = salesData.filter(sale => sale.timestamp !== timestampToDelete);
    
    localStorage.setItem(salesKey, JSON.stringify(updatedSales));
    setSalesData(updatedSales);
    setDeleteConfirm(null);
    toast.success('Sale deleted successfully!');
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value || 0);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return '';
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          Sale Entries
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          View all individual sales with descriptions and details.
        </p>
      </CardHeader>
      <CardContent>
        {sortedData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No sales recorded yet.</p>
            <p className="text-xs mt-1">Add sales using the Sale Entry form above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 min-w-[100px]"
                    onClick={() => handleSort('date')}
                  >
                    Date {getSortIcon('date')}
                  </TableHead>
                  <TableHead className="min-w-[200px]">
                    Description
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-center"
                    onClick={() => handleSort('revenue')}
                  >
                    Revenue {getSortIcon('revenue')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-center"
                    onClick={() => handleSort('cashCollected')}
                  >
                    Cash Collected {getSortIcon('cashCollected')}
                  </TableHead>
                  <TableHead className="text-center">Details</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((sale) => (
                  <TableRow key={sale.timestamp}>
                    <TableCell className="font-medium">
                      {formatDate(sale.date)}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate" title={sale.description}>
                        {sale.description || 'No description'}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(sale.revenue)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(sale.cashCollected)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {sale.hadMeeting && (
                          <Badge variant="secondary" className="text-xs">
                            Meeting
                          </Badge>
                        )}
                        {sale.isCustomJob && (
                          <Badge variant="outline" className="text-xs">
                            Custom
                          </Badge>
                        )}
                        {sale.isNewClient && (
                          <Badge variant="default" className="text-xs">
                            New Client
                          </Badge>
                        )}
                        {!sale.hadMeeting && !sale.isCustomJob && !sale.isNewClient && (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSale(sale.timestamp)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background border rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Delete Sale
              </h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete this sale? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={cancelDelete}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SaleEntriesTable;