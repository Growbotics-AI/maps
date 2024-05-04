import Sidebar from '../sidebar'
import TopBar from '../TopBar'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex grow flex-col">
      <TopBar />
      <main className="grow p-4">{children}</main>
    </div>
  </div>
)

export default Layout
