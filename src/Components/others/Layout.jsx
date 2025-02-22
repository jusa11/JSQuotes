import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from '../blocks/profile/other/Navbar';
import Sidebar from '../blocks/profile/other/Sidebar';
import PersonBlock from '../blocks/profile/other/PersonBlock';
import StatsProfile from '../blocks/profile/other/StatsProfile';
import Stepper from '../blocks/profile/other/Stepper';
import { selectStatsStatus } from '../redux/slices/statsBarSlice';

const Layout = () => {
  const statsBarStatus = useSelector(selectStatsStatus);

  return (
    <main className="profile">
      <div className="profile-container">
        <PersonBlock />
        <div className="profile-wrapper">
          <Sidebar />
          <section className="profile-content">
            <Outlet />
          </section>
          <section
            className={`profile-rigth ${statsBarStatus ? 'stats-active' : ''}`}
          >
            <StatsProfile />

            <Stepper />
          </section>
        </div>
      </div>

      <Navbar />
    </main>
  );
};

export default Layout;
