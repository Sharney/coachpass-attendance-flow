
import { useState } from 'react';
import { ScanLine, Users, BarChart3, DollarSign, Bell, Settings, QrCode, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckInModal } from '@/components/CheckInModal';
import { DashboardStats } from '@/components/DashboardStats';
import { ClientManagement } from '@/components/ClientManagement';
import { PayrollCalculator } from '@/components/PayrollCalculator';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCheckIn, setShowCheckIn] = useState(false);

  const upcomingClasses = [
    { id: 1, name: 'HIIT Training', time: '09:00', capacity: 12, enrolled: 8, coach: 'Alex Chen' },
    { id: 2, name: 'Yoga Flow', time: '10:30', capacity: 15, enrolled: 12, coach: 'Sarah Kim' },
    { id: 3, name: 'Strength Training', time: '14:00', capacity: 10, enrolled: 6, coach: 'Mike Johnson' },
    { id: 4, name: 'Cardio Blast', time: '18:00', capacity: 20, enrolled: 18, coach: 'Emma Wilson' },
  ];

  const todayStats = {
    totalClasses: 8,
    totalAttendance: 67,
    attendanceRate: 84,
    activeCoaches: 5
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'checkin':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">即時簽到管理</h2>
              <Button onClick={() => setShowCheckIn(true)} className="bg-primary hover:bg-primary/90">
                <QrCode className="mr-2 h-4 w-4" />
                開始簽到
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingClasses.map((classItem) => (
                <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{classItem.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          {classItem.time} • 教練: {classItem.coach}
                        </CardDescription>
                      </div>
                      <Badge variant={classItem.enrolled >= classItem.capacity * 0.8 ? "default" : "secondary"}>
                        {classItem.enrolled}/{classItem.capacity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>出席率</span>
                          <span>{Math.round((classItem.enrolled / classItem.capacity) * 100)}%</span>
                        </div>
                        <Progress value={(classItem.enrolled / classItem.capacity) * 100} className="h-2" />
                      </div>
                      <Button 
                        onClick={() => setShowCheckIn(true)} 
                        className="w-full bg-secondary hover:bg-secondary/90"
                      >
                        <ScanLine className="mr-2 h-4 w-4" />
                        掃描簽到
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'clients':
        return <ClientManagement />;
      case 'payroll':
        return <PayrollCalculator />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">CoachPass</h1>
              <p className="text-sm text-muted-foreground">健身房管理系統</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              通知
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              設定
            </Button>
            <div className="bg-primary text-primary-foreground p-2 rounded-full">
              <span className="text-sm font-medium">AC</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-border px-8 py-2">
        <div className="flex space-x-8">
          {[
            { id: 'dashboard', label: '儀表板', icon: BarChart3 },
            { id: 'checkin', label: '課程簽到', icon: ScanLine },
            { id: 'clients', label: '客戶管理', icon: Users },
            { id: 'payroll', label: '薪資計算', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Today's Overview */}
      <div className="px-8 py-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{todayStats.totalClasses}</div>
              <div className="text-sm text-muted-foreground">今日課程</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{todayStats.totalAttendance}</div>
              <div className="text-sm text-muted-foreground">總出席人次</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{todayStats.attendanceRate}%</div>
              <div className="text-sm text-muted-foreground">出席率</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{todayStats.activeCoaches}</div>
              <div className="text-sm text-muted-foreground">活躍教練</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-ipad">
        {renderTabContent()}
      </main>

      {/* Check-in Modal */}
      <CheckInModal open={showCheckIn} onOpenChange={setShowCheckIn} />
    </div>
  );
};

export default Index;
