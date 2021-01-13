import './App.css';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Component } from 'react';
import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomer : [],
      searchText:'',
      searchedColunm:''
    }
  }


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  async componentDidMount() {
    const urlApi = 'https://localhost:44322/api/Customer';

    await axios.get(urlApi).then(({data:res}) => {
      this.setState({
        listCustomer : res
      })
      console.log(res);
    })
  }

  render() {
    const dataSource = this.state.listCustomer;
    
    const columns = [
      {
        title: 'CustomerId',
        dataIndex: 'customerId',
        key: 'CustomerId',
        ...this.getColumnSearchProps('customerId'),
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
        ...this.getColumnSearchProps('companyName'),
      },
      {
        title: 'Contact Name',
        dataIndex: 'contactName',
        key: 'contactName',
        ...this.getColumnSearchProps('contactName'),
      },
      {
        title: 'Contact Title',
        dataIndex: 'contactTitle',
        key: 'contactTitle',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'Region',
        dataIndex: 'region',
        key: 'region',
      },
      {
        title: 'Postal Code ',
        dataIndex: 'postalCode',
        key: 'postalCode',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Fax',
        dataIndex: 'fax',
        key: 'fax',
      },
    ];

    return (
      <div>
      <div>
        <h1>List customer</h1>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
    );
  }
}

export default App;
