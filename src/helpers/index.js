import { Button, DatePicker, Input, Space } from "antd";
import Moment from "moment";
import {
        SearchOutlined
} from "@ant-design/icons";
import 'moment/locale/tr'; // Türkçe dil desteği ekleniyor
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';
import CryptoJS from 'crypto-js';
import { OperationClaims } from "../constants/operationClaims";

//Gönderilen Tarih-Saat formatını gün ay ve yıl olarak düzenler.
export const dateTemplate = (value) => {
        return (Moment(value).format('YYYY-MM-DDDD'));
}

export const filter = (data, columnName) => {
        let result = [];
        if (columnName.split('.').length > 1) {
                data.map(item => {
                        var isExist = result.filter(x => x.text === item[columnName.split('.')[0]][columnName.split('.')[1]] && x.value === item[columnName.split('.')[0]][columnName.split('.')[1]]);
                        if (isExist.length === 0)
                                result.push({
                                        text: item[columnName.split('.')[0]][columnName.split('.')[1]],
                                        value: item[columnName.split('.')[0]][columnName.split('.')[1]]
                                })
                })

        } else {
                data.map(item => {
                        var isExist = result.filter(x => x.text === item[columnName] && x.value === item[columnName]);
                        if (isExist.length === 0)
                                result.push({
                                        text: item[columnName],
                                        value: item[columnName]
                                })
                })

        }
        // eslint-disable-next-line array-callback-return

        return result
}

export const dateFilter = (data, columnName) => {
        let result = [];
        // eslint-disable-next-line array-callback-return
        data.map(item => {
                var isExist = result.filter(x => x.text === dateTemplate(item[columnName]) && x.value === dateTemplate(item[columnName]));
                if (isExist.length === 0)
                        result.push({
                                text: dateTemplate(item[columnName]),
                                value: dateTemplate(item[columnName])
                        })
        })
        return result
}

export const getColumnSearchProps = (dataIndex, searchInput, searchText, setSearchText, searchedColumn, setSearchedColumn) => {
        const handleSearch = (selectedKeys, confirm, dataIndex) => {
                confirm();
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
        };

        const handleReset = (clearFilters) => {
                clearFilters();
                setSearchText('');
        };

        return {
                filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                        <div
                                style={{
                                        padding: 8,
                                }}
                                onKeyDown={(e) => e.stopPropagation()}
                        >

                                {dataIndex.includes("Date") || dataIndex.includes("date") ? (
                                        <DatePicker
                                                ref={searchInput}
                                                placeholder={`Ara`}
                                                value={selectedKeys[0] ? dayjs(selectedKeys[0]) : null}
                                                onChange={(date) => setSelectedKeys(date ? [date.format('YYYY-MM-DDDD')] : [])}
                                                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                                                style={{
                                                        marginBottom: 8,
                                                        display: 'block',
                                                }}
                                        />
                                ) : (
                                        <Input
                                                ref={searchInput}
                                                placeholder={`Ara`}
                                                value={selectedKeys[0]}
                                                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                                                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                                                style={{
                                                        marginBottom: 8,
                                                        display: 'block',
                                                }}
                                        />
                                )}
                                <Space>
                                        <Button
                                                type="primary"
                                                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                                                icon={<SearchOutlined />}
                                                size="small"
                                                style={{
                                                        width: 90,
                                                }}
                                        >
                                                Ara
                                        </Button>
                                        <Button
                                                onClick={() => clearFilters && handleReset(clearFilters)}
                                                size="small"
                                                style={{
                                                        width: 90,
                                                }}
                                        >
                                                Sıfırla
                                        </Button>
                                        <Button
                                                type="link"
                                                size="small"
                                                onClick={() => {
                                                        confirm({
                                                                closeDropdown: false,
                                                        });
                                                        setSearchText(selectedKeys[0]);
                                                        setSearchedColumn(dataIndex);
                                                }}
                                        >
                                                Filtre
                                        </Button>
                                        <Button
                                                type="link"
                                                size="small"
                                                onClick={() => {
                                                        close();
                                                }}
                                        >
                                                Kapat
                                        </Button>
                                </Space>
                        </div>
                ),
                filterIcon: (filtered) => (
                        <SearchOutlined
                                style={{
                                        color: filtered ? '#1677ff' : undefined,
                                }}
                        />
                ),
                onFilter: (value, record) => {
                        if (Array.isArray(record[dataIndex])) {
                                return record[dataIndex].some(item =>
                                        Object.values(item).some(field =>
                                                field.toString().toLowerCase().includes(value.toLowerCase())
                                        )
                                );
                        } else if (dataIndex.includes("Date") || dataIndex.includes("date")) {
                                return dayjs(record[dataIndex]).format('YYYY-MM-DDDD') === value;
                        } else {
                                return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
                        }
                },
                filterDropdownProps: {
                        onOpenChange(open) {
                                if (open) {
                                        setTimeout(() => searchInput.current?.select(), 100);
                                }
                        },
                },
                render: (text) =>
                        searchedColumn === dataIndex ? (
                                <Highlighter
                                        highlightStyle={{
                                                backgroundColor: '#ffc069',
                                                padding: 0,
                                        }}
                                        searchWords={[searchText]}
                                        autoEscape
                                        textToHighlight={text ? text.toString() : ''}
                                />
                        ) : (
                                text
                        ),
        };
}

export const encryptData = (data) => {
        return CryptoJS.AES.encrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString();
};


export const hasAnyClaim = (userClaims, requiredClaims) => {
        requiredClaims.push(OperationClaims.GeneralAdmin);
        requiredClaims.push(OperationClaims.TenantAdmin);
        // Kullanıcı claim'leri ile gerekli claim'ler arasında kesişim var mı kontrol eder
        return requiredClaims.some((claim) => userClaims.includes(claim));
};
