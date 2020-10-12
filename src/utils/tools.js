import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import CryptoJs from 'crypto-js'

/**
 * @description 对tree_data进行遍历，label重新赋值为[id] label
 * @param treeData {Array} 传入的数组
 * @return newTreeData 返回重组后的tree_data
 * */
export function resetTreeData(treeData) {
	treeData.map(v => {
		if (v.label && v.id) v.label = `[${v.id}] `+ v.label
		if (v.children && v.children.length > 0) {
			let item = v.children
			resetTreeData(item)
		}
	})
	return treeData
}

/**
 * @description 批量导入Excel中的数据
 * */
export function importExcelToData() {
	console.log('is developing')
}

/**
 * @description 将表格数据导出为Excel文件
 * */
export function exportToExcelFile(el) {
	const dom_node = XLSX.utils.table_to_book(el)
	const file = XLSX.write(dom_node, {
		bookType: 'xlsx',
		bookSST: true,
		type: 'array'
	})
	try {
		FileSaver.saveAs(new Blob([file], {
			type: 'application/octet-stream'
		}), 'data_in_table.xlsx')
	} catch (e) {
		if (typeof console !== 'undefined') console.log(e, file)
	}
	return file
}

/**
 * @description 密码加密操作
 * @param password {String} 需要加密的密码
 * @return encrypted {String} 加密后的密文
 * */
const encryptKey = 'THISISANOPERATIONFORPASSWORDENCRYPTANDDECRYPT'	// 唯一秘钥
export function encrypt(password) {
	const key = CryptoJS.enc.Utf8.parse(encryptKey)
	const srcs = CryptoJS.enc.Utf8.parse(password)
	const encrypted = CryptoJS.AES.encrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	})
	return encrypted.toString()
}

/**
 * @description 密码的解密操作
 * */
export function decrypt(password) {
	const key = CryptoJS.enc.Utf8.parse(encryptKey)
	const decrypted = CryptoJS.AES.decrypt(password, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Utf8.stringify(decrypted).toString();
}