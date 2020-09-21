import XLSX from 'xlsx'
import FileSaver from 'file-saver'

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