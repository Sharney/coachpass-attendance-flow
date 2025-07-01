
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Calendar, Clock, Star } from 'lucide-react';

export const DashboardStats = () => {
  const weeklyStats = {
    totalClasses: 42,
    totalAttendance: 358,
    averageAttendance: 85,
    topClass: 'HIIT Training',
    peakHour: '18:00-19:00',
    activeMembers: 156
  };

  const classPerformance = [
    { name: 'HIIT Training', attendance: 92, trend: 'up', sessions: 8 },
    { name: 'Yoga Flow', attendance: 88, trend: 'up', sessions: 6 },
    { name: 'Strength Training', attendance: 76, trend: 'down', sessions: 5 },
    { name: 'Cardio Blast', attendance: 82, trend: 'up', sessions: 7 },
    { name: 'Pilates', attendance: 71, trend: 'down', sessions: 4 },
  ];

  const coachPerformance = [
    { name: 'Alex Chen', classes: 12, rating: 4.9, attendance: 91 },
    { name: 'Sarah Kim', classes: 10, rating: 4.8, attendance: 88 },
    { name: 'Mike Johnson', classes: 8, rating: 4.7, attendance: 85 },
    { name: 'Emma Wilson', classes: 9, rating: 4.6, attendance: 82 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">出席統計儀表板</h2>
        <Badge variant="secondary" className="text-sm">
          本週數據 • {new Date().toLocaleDateString('zh-TW')}
        </Badge>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">總課程數</CardTitle>
            <div className="text-2xl font-bold text-primary">{weeklyStats.totalClasses}</div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% 較上週
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">總出席人次</CardTitle>
            <div className="text-2xl font-bold text-secondary">{weeklyStats.totalAttendance}</div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% 較上週
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">平均出席率</CardTitle>
            <div className="text-2xl font-bold text-green-600">{weeklyStats.averageAttendance}%</div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2% 較上週
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">熱門課程</CardTitle>
            <div className="text-lg font-bold text-orange-600">{weeklyStats.topClass}</div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-muted-foreground">92% 出席率</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">尖峰時段</CardTitle>
            <div className="text-lg font-bold text-purple-600">{weeklyStats.peakHour}</div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-muted-foreground">18位學員</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">活躍會員</CardTitle>
            <div className="text-2xl font-bold text-blue-600">{weeklyStats.activeMembers}</div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15 新會員
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              課程表現分析
            </CardTitle>
            <CardDescription>各課程出席率與趨勢</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classPerformance.map((classItem, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{classItem.name}</span>
                      {classItem.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{classItem.attendance}%</div>
                      <div className="text-xs text-muted-foreground">{classItem.sessions} 堂課</div>
                    </div>
                  </div>
                  <Progress value={classItem.attendance} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coach Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              教練表現評估
            </CardTitle>
            <CardDescription>教練課程數量與評分</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coachPerformance.map((coach, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {coach.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{coach.name}</p>
                      <p className="text-sm text-muted-foreground">{coach.classes} 堂課</p>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{coach.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{coach.attendance}% 出席</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trend Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            每日出席趋勢
          </CardTitle>
          <CardDescription>過去7天的出席率變化</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">圖表功能開發中</p>
              <p className="text-sm text-muted-foreground">將顯示詳細的出席率趨勢分析</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
