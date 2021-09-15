// export type UserManagementPageProps = { :  }

import Register from "../components/register"
import Layout from "../layouts/layout"

export const RegisterPage: React.FC = () => {
	return (
		<Layout>
			<div className="d-flex flex-column flex-fill flex-grow">
				<div className="d-flex flex-fill">
					<h1>Register User</h1>
				</div>
				<div className="d-flex flex-fill flex-grow justify-content-center">
					<Register />
				</div>
			</div>
		</Layout>
	)
}

export default RegisterPage
