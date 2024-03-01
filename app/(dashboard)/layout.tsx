import {Sidebar} from "./_components/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;

}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
    return (
        <main className="h-full">
            <Sidebar/>
            <div className="pl-[60px]">
                {children}
            </div>
        </main>
    );
}

export default DashboardLayout;