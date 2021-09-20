// export type UserManagementPageProps = { :  }

// import Register from "../components/register"
import Layout from "../layouts/layout"

export const UserPage: React.FC = () => {
	return (
		<Layout>
			<h1>Edit User</h1>
			<h2>Username</h2>
			<p>Please Previous Username</p>
			<p>Please Enter Password to Verify</p>
			<h2>Email</h2>
			<p>Please Previous Email</p>
			<p>Please Enter Password to Verify</p>
			<h2>Delete User</h2>
			<p>Button to delete Press: </p>
			<p>Show password input Password</p>
			<p> Show Red ConfirmButton</p>
		</Layout>
	)
}

export default UserPage
