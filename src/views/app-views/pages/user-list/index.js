import React, { Component } from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import exampleService from "../../../../services/ExampleService";
import Loading from "../../../../components/shared-components/Loading";
import EditProfile from "../setting/EditProfile";

export class UserList extends Component {

	state = {
		users: null,
		userProfileVisible: false,
		selectedUser: null
	}

	componentDidMount() {
		exampleService.getUsers()
			.then(r => {
				this.setState({
					users: r.map(u => ({
						id: u.id,
						name: u.name,
						address: u.address.city,
						website: u.website,
						email: u.email,
						phone: u.phone,
						username: u.username,
						companyBs: u.company.bs,
						companyName: u.company.name
					}))
				})
				console.log(r)
			})
			.catch(e => {
				console.error(e)
			})
	}

	deleteUser = userId => {
		this.setState({
			users: this.state.users.filter(item => item.id !== userId),
		})
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	showUserProfile = userInfo => {
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
	};
	
	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
    });
	}

	render() {
		const { users, userProfileVisible, selectedUser } = this.state;

		const tableColumns = [
			{
				title: 'User',
				dataIndex: 'name',
				render: (_, record) => (
					<div className="d-flex">
						<AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
  						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Phone',
				dataIndex: 'phone',
				sorter: {
					compare: (a, b) => a.phone.length - b.phone.length,
				},
			},
			{
				title: 'City',
				dataIndex: 'address',
				render: city => (
					<span>{city}</span>
				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Company name',
				dataIndex: 'companyName',
				render: companyName => (
					<Tag className ="text-capitalize" color={companyName.length > 12 ? 'cyan' : 'red'}>{companyName}</Tag>
				),
				sorter: {
					compare: (a, b) => a.companyName.length - b.companyName.length,
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right">
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {this.showUserProfile(elm)}} size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];

		if (!users) return <Loading />

		return (
			<Card bodyStyle={{'padding': '0px'}}>
				<Table columns={tableColumns} dataSource={users} rowKey='id' />
				<EditProfile data={selectedUser} visible={userProfileVisible} close={()=> {this.closeUserProfile()}}/>
			</Card>
		)
	}
}

export default UserList
