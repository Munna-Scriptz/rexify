import AddressTab from '../../components/AddressTab';

export default async function AddressesPage() {
  const addresses = [
    { id: 1, type: 'Home', isDefault: true, details: '123 Tech Lane, Silicon Valley, CA 94025', phone: '+1 (555) 000-1234' },
    { id: 2, type: 'Office', isDefault: false, details: '456 Innovation Way, San Francisco, CA 94105', phone: '+1 (555) 999-5678' },
  ];

  return (
    <AddressTab addressData={addresses} />
  );
}
