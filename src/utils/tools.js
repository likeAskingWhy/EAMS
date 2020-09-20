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
