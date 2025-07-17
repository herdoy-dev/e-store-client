import { AppAreaChart } from "@/components/app-area-chart";
import { AppBarChart } from "@/components/app-bar-chart";
import { AppLineChart } from "@/components/app-line-chart";
import { AppPieChart } from "@/components/app-pie-chart";
import CardList from "@/components/card-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import TodoList from "./todo-list";

function Dashboard() {
  return (
    <div>
      <h1 className="pb-6 text-3xl font-semibold">Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-primary-foreground rounded-xl">
          <AppBarChart />
        </div>
        <div className="p-4 bg-primary-foreground rounded-xl">
          <ScrollArea>
            <CardList title="Customers" />
          </ScrollArea>
        </div>
        <div className="p-4 bg-primary-foreground rounded-xl">
          <AppPieChart />
        </div>
        <div className="p-4 bg-primary-foreground rounded-xl">
          <AppLineChart />
        </div>
        <div className="p-4 bg-primary-foreground rounded-xl">
          <TodoList />
        </div>
        <div className="p-4 bg-primary-foreground rounded-xl">
          <AppAreaChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
