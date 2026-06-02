
import ProfileNavbar from '@/app/components/navbar/ProfileNavbar';
import { apiClient } from '../../lib/apiClient';

export default async function ProfileLayout({ children }) {

  const user = await apiClient.get('/auth/profile');

  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      <ProfileNavbar user={user} />
      <section className="flex-1 md:h-screen overflow-y-auto pt-4 md:pt-6 pb-20 md:pb-10 px-4 md:px-6">
        {children}
      </section>
    </main>
  );
}
