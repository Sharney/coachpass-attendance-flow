
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Phone, Mail, Calendar, TrendingUp, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const clients = [
    {
      id: 1,
      name: '王小明',
      email: 'wang@example.com',
      phone: '0912-345-678',
      joinDate: '2024-01-15',
      totalClasses: 24,
      attendanceRate: 92,
      lastVisit: '2024-12-30',
      status: 'active',
      membershipType: '月費會員',
      notes: '喜歡高強度訓練，需要注意膝蓋舊傷',
      favoriteClasses: ['HIIT Training', 'Strength Training'],
      avatar: 'WM'
    },
    {
      id: 2,
      name: '李美華',
      email: 'li@example.com',
      phone: '0923-456-789',
      joinDate: '2024-02-20',
      totalClasses: 18,
      attendanceRate: 88,
      lastVisit: '2024-12-29',
      status: 'active',
      membershipType: '季度會員',
      notes: '瑜伽愛好者，注重身心平衡',
      favoriteClasses: ['Yoga Flow', 'Pilates'],
      avatar: 'LH'
    },
    {
      id: 3,
      name: '張大偉',
      email: 'zhang@example.com',
      phone: '0934-567-890',
      joinDate: '2024-03-10',
      totalClasses: 12,
      attendanceRate: 65,
      lastVisit: '2024-12-20',
      status: 'inactive',
      membershipType: '月費會員',
      notes: '最近出席率下降，需要跟進',
      favoriteClasses: ['Cardio Blast'],
      avatar: 'ZW'
    },
    {
      id: 4,
      name: '陳小芳',
      email: 'chen@example.com',
      phone: '0945-678-901',
      joinDate: '2024-04-05',
      totalClasses: 32,
      attendanceRate: 96,
      lastVisit: '2024-12-31',
      status: 'vip',
      membershipType: '年度會員',
      notes: 'VIP會員，非常積極參與各種課程',
      favoriteClasses: ['HIIT Training', 'Yoga Flow', 'Strength Training'],
      avatar: 'CF'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'vip': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '活躍';
      case 'inactive': return '非活躍';
      case 'vip': return 'VIP';
      default: return '一般';
    }
  };

  const handleSendMessage = (clientName: string) => {
    toast.success(`已發送訊息給 ${clientName}`, {
      description: '客戶將收到關懷訊息'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">客戶管理</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              新增客戶
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>新增客戶</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input id="name" placeholder="請輸入客戶姓名" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">電子郵件</Label>
                <Input id="email" type="email" placeholder="請輸入電子郵件" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">電話號碼</Label>
                <Input id="phone" placeholder="請輸入電話號碼" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">備註</Label>
                <Textarea id="notes" placeholder="特殊需求或注意事項" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                新增客戶
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜尋客戶姓名、電話或信箱..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Client Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{clients.length}</div>
            <div className="text-sm text-muted-foreground">總客戶數</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {clients.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">活躍會員</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {clients.filter(c => c.status === 'vip').length}
            </div>
            <div className="text-sm text-muted-foreground">VIP會員</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(clients.reduce((acc, c) => acc + c.attendanceRate, 0) / clients.length)}%
            </div>
            <div className="text-sm text-muted-foreground">平均出席率</div>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{client.avatar}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>{client.membershipType}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(client.status)}>
                  {getStatusText(client.status)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>最後到訪: {client.lastVisit}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="font-semibold text-primary">{client.totalClasses}</div>
                  <div className="text-xs text-muted-foreground">總課程數</div>
                </div>
                <div>
                  <div className="font-semibold text-secondary">{client.attendanceRate}%</div>
                  <div className="text-xs text-muted-foreground">出席率</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">偏好課程:</div>
                <div className="flex flex-wrap gap-1">
                  {client.favoriteClasses.map((classType, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {classType}
                    </Badge>
                  ))}
                </div>
              </div>

              {client.notes && (
                <div className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                  {client.notes}
                </div>
              )}

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      詳情
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{client.name} - 詳細資料</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">基本資訊</Label>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div>電話: {client.phone}</div>
                            <div>信箱: {client.email}</div>
                            <div>加入日期: {client.joinDate}</div>
                            <div>會員類型: {client.membershipType}</div>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">出席統計</Label>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div>總課程: {client.totalClasses} 堂</div>
                            <div>出席率: {client.attendanceRate}%</div>
                            <div>最後到訪: {client.lastVisit}</div>
                            <div>狀態: {getStatusText(client.status)}</div>
                          </div>
                        </div>
                      </div>
                      {client.notes && (
                        <div>
                          <Label className="text-sm font-medium">備註</Label>
                          <div className="text-sm text-muted-foreground mt-1 p-2 bg-muted/30 rounded">
                            {client.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                  onClick={() => handleSendMessage(client.name)}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  聯繫
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
