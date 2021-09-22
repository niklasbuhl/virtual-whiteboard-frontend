// export type UserManagementPageProps = { :  }

import EditUser from "../components/editUser"
import Layout from "../layouts/layout"

export const UserPage: React.FC = () => {
	return (
		<Layout>
			<EditUser />
		</Layout>
	)
}

export default UserPage
