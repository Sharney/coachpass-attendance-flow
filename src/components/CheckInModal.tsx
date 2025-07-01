
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { QrCode, Search, UserCheck, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';

interface CheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckInModal = ({ open, onOpenChange }: CheckInModalProps) => {
  const [selectedClass, setSelectedClass] = useState<number | null>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [scanningMode, setScanningMode] = useState(false);

  const classes = [
    { id: 1, name: 'HIIT Training', time: '09:00', coach: 'Alex Chen', enrolled: 8, capacity: 12 },
    { id: 2, name: 'Yoga Flow', time: '10:30', coach: 'Sarah Kim', enrolled: 12, capacity: 15 },
  ];

  const clients = [
    { id: 1, name: '王小明', phone: '0912-345-678', status: 'pending', avatar: 'WM' },
    { id: 2, name: '李美華', phone: '0923-456-789', status: 'checked-in', avatar: 'LH' },
    { id: 3, name: '張大偉', phone: '0934-567-890', status: 'pending', avatar: 'ZW' },
    { id: 4, name: '陳小芳', phone: '0945-678-901', status: 'pending', avatar: 'CF' },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleCheckIn = (clientId: number, clientName: string) => {
    toast.success(`${clientName} 簽到成功！`, {
      description: `時間: ${new Date().toLocaleTimeString('zh-TW', { hour12: false })}`,
    });
  };

  const startQRScan = () => {
    setScanningMode(true);
    // Simulate QR scanning
    setTimeout(() => {
      setScanningMode(false);
      toast.success('QR碼掃描成功！', {
        description: '王小明已成功簽到',
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">課程簽到管理</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Class Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">選擇課程</h3>
            {classes.map((classItem) => (
              <Card 
                key={classItem.id}
                className={`cursor-pointer transition-all ${
                  selectedClass === classItem.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedClass(classItem.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{classItem.name}</h4>
                    <Badge variant="secondary">
                      {classItem.enrolled}/{classItem.capacity}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {classItem.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      教練: {classItem.coach}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* QR Scanner */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">QR碼掃描</h3>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                {scanningMode ? (
                  <div className="animate-pulse">
                    <div className="w-32 h-32 bg-primary/20 rounded-lg mx-auto flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-primary animate-pulse-success" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">掃描中...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-32 h-32 bg-muted rounded-lg mx-auto flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <Button onClick={startQRScan} className="w-full bg-secondary hover:bg-secondary/90">
                      <QrCode className="mr-2 h-4 w-4" />
                      開始掃描QR碼
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Manual Check-in */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">手動簽到</h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋客戶姓名或電話..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredClients.map((client) => (
                <Card key={client.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{client.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.phone}</p>
                        </div>
                      </div>
                      
                      {client.status === 'checked-in' ? (
                        <Badge className="bg-green-100 text-green-800">
                          <UserCheck className="h-3 w-3 mr-1" />
                          已簽到
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleCheckIn(client.id, client.name)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          簽到
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            關閉
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            完成簽到
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
