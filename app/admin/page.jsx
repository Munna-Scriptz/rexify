import { redirect } from 'next/navigation'

const page = () => {
    return redirect('/admin/dashboard')
}

export default page