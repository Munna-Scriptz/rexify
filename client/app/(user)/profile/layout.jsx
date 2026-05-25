import ProfileNavbar from '../components/ProfileNavbar';
import { apiClient } from '../../lib/apiClient';

export default async function ProfileLayout({ children }) {

  const user = await apiClient.get('/auth/profile');

  return (
    <main className="flex min-h-screen">
      <ProfileNavbar user={user} />
      <section className="flex-1 h-screen overflow-y-auto pt-6 pb-10 px-6">
        {children}
      </section>
    </main>
  );
}
