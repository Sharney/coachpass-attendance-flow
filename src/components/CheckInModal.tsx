
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
      <DialogContent className="max-w-sm mx-4 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-primary">課程簽到管理</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Class Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">選擇課程</h3>
            {classes.map((classItem) => (
              <Card 
                key={classItem.id}
                className={`cursor-pointer transition-all ${
                  selectedClass === classItem.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedClass(classItem.id)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{classItem.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {classItem.enrolled}/{classItem.capacity}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {classItem.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      教練: {classItem.coach}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* QR Scanner */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">QR碼掃描</h3>
            <Card className="text-center p-4">
              <CardContent className="space-y-3">
                {scanningMode ? (
                  <div className="animate-pulse">
                    <div className="w-24 h-24 bg-primary/20 rounded-lg mx-auto flex items-center justify-center">
                      <QrCode className="h-12 w-12 text-primary animate-pulse-success" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">掃描中...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-muted rounded-lg mx-auto flex items-center justify-center">
                      <QrCode className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <Button onClick={startQRScan} className="w-full bg-secondary hover:bg-secondary/90" size="sm">
                      <QrCode className="mr-2 h-3 w-3" />
                      開始掃描QR碼
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Manual Check-in */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">手動簽到</h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="搜尋客戶姓名或電話..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 text-sm"
                size={undefined}
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredClients.map((client) => (
                <Card key={client.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{client.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.phone}</p>
                        </div>
                      </div>
                      
                      {client.status === 'checked-in' ? (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <UserCheck className="h-3 w-3 mr-1" />
                          已簽到
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleCheckIn(client.id, client.name)}
                          className="bg-primary hover:bg-primary/90 text-xs px-2 py-1"
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

        <div className="flex flex-col space-y-2 pt-4 border-t">
          <Button className="bg-primary hover:bg-primary/90 w-full">
            完成簽到
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
            關閉
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
