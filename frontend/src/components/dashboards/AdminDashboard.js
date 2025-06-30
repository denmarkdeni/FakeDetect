import DashboardLayout from "../layout/DashboardLayout";


function AdminDashboard(){
    return(
        <DashboardLayout title="Admin Dashboard" className="admin-dashboard">
            <br />
            <p>Welcome to the Admin Dashboard. Here you can manage users, products, and view analytics.</p>
            {/* Add more admin functionalities here */}
        </DashboardLayout>
    );
}

export  default AdminDashboard;