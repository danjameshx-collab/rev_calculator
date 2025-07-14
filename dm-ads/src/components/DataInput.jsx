import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Plus, Save } from 'lucide-react';
import { toast } from 'sonner';

const DataInput = ({ onDataSubmit }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    cashCollected: '',
    revenue: '',
    hadMeeting: false,
    isCustomJob: false,
    isNewClient: false
  });

  const [statsData, setStatsData] = useState({
    date: new Date().toISOString().split('T')[0],
    meetings: '',
    conversations: '',
    shows: ''
  });
  

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStatsChange = (field, value) => {
    setStatsData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if at least one field has data (description, revenue, or cash collected)
    const hasData = formData.description.trim() || formData.cashCollected || formData.revenue;
    
    if (!hasData) {
      toast.error('Please fill in at least one field (description, revenue, or cash collected)');
      return;
    }

    // Validate cash collected doesn't exceed revenue
    const cashCollected = parseFloat(formData.cashCollected) || 0;
    const revenue = parseFloat(formData.revenue) || 0;
    if (cashCollected > revenue && revenue > 0) {
      toast.error('Cash collected cannot exceed total revenue');
      return;
    }

    // Prepare data for submission
    const dataToSubmit = {
      date: formData.date,
      description: formData.description.trim(),
      cashCollected: cashCollected,
      revenue: revenue,
      hadMeeting: formData.hadMeeting,
      isCustomJob: formData.isCustomJob,
      isNewClient: formData.isNewClient,
      // Keep for backward compatibility
      totalRevenue: revenue,
      newRevenue: revenue,
      recurringRevenue: 0,
      isEdit: false
    };

    // Call the parent component's submit handler
    if (onDataSubmit) {
      onDataSubmit(dataToSubmit);
    }

    // Show success message
    toast.success('Sale data added successfully!');

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      cashCollected: '',
      revenue: '',
      hadMeeting: false,
      isCustomJob: false,
      isNewClient: false
    });
  };

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    
    // Check if at least one stat field has data
    const hasData = statsData.meetings || statsData.conversations || statsData.shows;
    
    if (!hasData) {
      toast.error('Please fill in at least one statistic');
      return;
    }

    // Prepare stats for submission
    const statsToSubmit = {
      date: statsData.date,
      meetings: parseInt(statsData.meetings) || 0,
      conversations: parseInt(statsData.conversations) || 0,
      shows: parseInt(statsData.shows) || 0,
      isStats: true
    };

    // Call the parent component's submit handler
    if (onDataSubmit) {
      onDataSubmit(statsToSubmit);
    }

    // Show success message
    toast.success('Statistics added successfully!');

    // Reset stats form
    setStatsData({
      date: new Date().toISOString().split('T')[0],
      meetings: '',
      conversations: '',
      shows: ''
    });
  };


  return (
    <div className="space-y-6">
      {/* Sale Entry Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-muted-foreground" />
            Sale Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Date
                </Label>
                <div className="w-fit">
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description
                </Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="What did you sell? (e.g., Logo design, Website package, etc.)"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              {/* Revenue Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue">
                    Total Revenue
                  </Label>
                  <Input
                    id="revenue"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="$0.00"
                    value={formData.revenue}
                    onChange={(e) => handleInputChange('revenue', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Full deal value
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cashCollected">
                    Cash Collected
                  </Label>
                  <Input
                    id="cashCollected"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="$0.00"
                    value={formData.cashCollected}
                    onChange={(e) => handleInputChange('cashCollected', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Amount actually received
                  </p>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Sale Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hadMeeting"
                      checked={formData.hadMeeting}
                      onChange={(e) => handleInputChange('hadMeeting', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="hadMeeting" className="text-sm">
                      Had Meeting
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isCustomJob"
                      checked={formData.isCustomJob}
                      onChange={(e) => handleInputChange('isCustomJob', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="isCustomJob" className="text-sm">
                      Custom Job
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isNewClient"
                      checked={formData.isNewClient}
                      onChange={(e) => handleInputChange('isNewClient', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="isNewClient" className="text-sm">
                      New Client
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="flex items-center gap-2 w-full sm:w-auto">
              <Save className="h-4 w-4" />
              Save Sale
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Statistics Entry Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-muted-foreground" />
            Daily Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStatsSubmit} className="space-y-4">
            <div className="space-y-4">
              {/* Stats Date */}
              <div className="space-y-2">
                <Label htmlFor="statsDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Date
                </Label>
                <div className="w-fit">
                  <Input
                    id="statsDate"
                    type="date"
                    value={statsData.date}
                    onChange={(e) => handleStatsChange('date', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Stats Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="statsMeetings">
                    Meetings
                  </Label>
                  <Input
                    id="statsMeetings"
                    type="number"
                    min="0"
                    placeholder="# of meetings"
                    value={statsData.meetings}
                    onChange={(e) => handleStatsChange('meetings', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conversations">
                    Conversations
                  </Label>
                  <Input
                    id="conversations"
                    type="number"
                    min="0"
                    placeholder="# of conversations"
                    value={statsData.conversations}
                    onChange={(e) => handleStatsChange('conversations', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="statsShows">
                    Shows
                  </Label>
                  <Input
                    id="statsShows"
                    type="number"
                    min="0"
                    placeholder="# of shows"
                    value={statsData.shows}
                    onChange={(e) => handleStatsChange('shows', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="flex items-center gap-2 w-full sm:w-auto">
              <Save className="h-4 w-4" />
              Save Statistics
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <div className="p-4 bg-muted rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">
          How to Use
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-xs font-medium text-foreground mb-1">Sale Entry</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• <strong>Description:</strong> Brief description of what you sold</li>
              <li>• <strong>Revenue:</strong> Total deal value</li>
              <li>• <strong>Cash Collected:</strong> Amount actually received</li>
              <li>• <strong>Had Meeting:</strong> Check if you had a meeting for this sale</li>
              <li>• <strong>Custom Job:</strong> Check if this was a custom job vs package</li>
              <li>• <strong>New Client:</strong> Check if this was a new client</li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-medium text-foreground mb-1">Daily Statistics</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• <strong>Meetings:</strong> Total number of meetings/calls you had</li>
              <li>• <strong>Conversations:</strong> Number of meaningful conversations</li>
              <li>• <strong>Shows:</strong> Number of people who showed up to meetings</li>
              <li>• Fill in only what you have data for</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataInput;

