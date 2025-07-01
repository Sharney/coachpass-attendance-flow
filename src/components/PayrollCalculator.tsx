
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign, Download, FileText, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export const PayrollCalculator = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-12');
  
  const coaches = [
    {
      id: 1,
      name: 'Alex Chen',
      avatar: 'AC',
      classes: [
        { type: 'HIIT Training', sessions: 15, rate: 800, total: 12000 },
        { type: 'Strength Training', sessions: 8, rate: 850, total: 6800 },
      ],
      totalSessions: 23,
      totalEarnings: 18800,
      bonus: 1000,
      finalPay: 19800
    },
    {
      id: 2,
      name: 'Sarah Kim',
      avatar: 'SK',
      classes: [
        { type: 'Yoga Flow', sessions: 18, rate: 750, total: 13500 },
        { type: 'Pilates', sessions: 6, rate: 800, total: 4800 },
      ],
      totalSessions: 24,
      totalEarnings: 18300,
      bonus: 1200,
      finalPay: 19500
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: 'MJ',
      classes: [
        { type: 'Strength Training', sessions: 12, rate: 850, total: 10200 },
        { type: 'Cardio Blast', sessions: 10, rate: 700, total: 7000 },
      ],
      totalSessions: 22,
      totalEarnings: 17200,
      bonus: 800,
      finalPay: 18000
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: 'EW',
      classes: [
        { type: 'Cardio Blast', sessions: 20, rate: 700, total: 14000 },
        { type: 'HIIT Training', sessions: 5, rate: 800, total: 4000 },
      ],
      totalSessions: 25,
      totalEarnings: 18000,
      bonus: 1500,
      finalPay: 19500
    }
  ];

  const monthlyStats = {
    totalClasses: coaches.reduce((acc, coach) => acc + coach.totalSessions, 0),
    totalPayroll: coaches.reduce((acc, coach) => acc + coach.finalPay, 0),
    totalBonus: coaches.reduce((acc, coach) => acc + coach.bonus, 0),
    averagePay: Math.round(coaches.reduce((acc, coach) => acc + coach.finalPay, 0) / coaches.length)
  };

  const handleExportPayroll = () => {
    toast.success('薪資報表已匯出', {
      description: `${selectedMonth} 月份薪資報表 PDF 已下載`
    });
  };

  const handleSendPayslip = (coachName: string) => {
    toast.success(`薪資單已發送`, {
      description: `${coachName} 的薪資單已發送至電子信箱`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">教練薪資計算</h2>
        <div className="flex items-center gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="選擇月份" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-12">2024年12月</SelectItem>
              <SelectItem value="2024-11">2024年11月</SelectItem>
              <SelectItem value="2024-10">2024年10月</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportPayroll} className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            匯出報表
          </Button>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{monthlyStats.totalClasses}</div>
            <div className="text-sm text-muted-foreground">總授課堂數</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              ${monthlyStats.totalPayroll.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">總薪資支出</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">
              ${monthlyStats.totalBonus.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">總獎金</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              ${monthlyStats.averagePay.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">平均薪資</div>
          </CardContent>
        </Card>
      </div>

      {/* Coach Payroll Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">教練薪資明細</h3>
        
        {coaches.map((coach) => (
          <Card key={coach.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{coach.avatar}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{coach.name}</CardTitle>
                    <CardDescription>
                      {selectedMonth} • {coach.totalSessions} 堂課
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ${coach.finalPay.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">應發薪資</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Class Breakdown */}
                <div>
                  <h4 className="font-medium mb-2">課程明細</h4>
                  <div className="space-y-2">
                    {coach.classes.map((classType, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                        <div>
                          <span className="font-medium">{classType.type}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {classType.sessions} 堂 × ${classType.rate}
                          </span>
                        </div>
                        <span className="font-semibold">${classType.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="border-t pt-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>基本薪資</span>
                      <span>${coach.totalEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-secondary">
                      <span>績效獎金</span>
                      <span>+${coach.bonus.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>應發總額</span>
                      <span className="text-green-600">${coach.finalPay.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSendPayslip(coach.name)}
                    className="flex-1"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    發送薪資單
                  </Button>
                  <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    績效詳情
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            薪資發放記錄
          </CardTitle>
          <CardDescription>最近三個月的薪資發放狀況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['2024-12', '2024-11', '2024-10'].map((month, index) => (
              <div key={month} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{month} 月份薪資</p>
                    <p className="text-sm text-muted-foreground">4位教練 • 94堂課</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(monthlyStats.totalPayroll - index * 2000).toLocaleString()}</p>
                  <Badge variant={index === 0 ? "default" : "secondary"}>
                    {index === 0 ? "處理中" : "已發放"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
