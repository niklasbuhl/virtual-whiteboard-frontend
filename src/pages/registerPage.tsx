// export type UserManagementPageProps = { :  }

import Register from "../components/register"
import Layout from "../layouts/layout"

export const RegisterPage: React.FC = () => {
	return (
		<Layout>
			<h1>Register User</h1>
			<Register />
		</Layout>
	)
}

export default RegisterPage
