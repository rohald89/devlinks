import { FC } from 'react';
import { TabsContent } from './ui/Tabs';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <div>
      <TabsContent value="links">Links</TabsContent>
      <TabsContent value="profile">Profile</TabsContent>
    </div>
  );
};

export default Dashboard;
