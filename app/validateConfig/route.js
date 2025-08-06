module.exports = {

    add: {
        affix: { type: 'boolean', required: true },
        isEle: { type: 'boolean', required: true },
        cache: { type: 'boolean', required: true },
        enable: { type: 'boolean', required: true },
        isChecked: { type: 'boolean', required: true },
        type: { type: 'number', required: true },
        sort_id: { type: 'number', required: true },
        api: { type: 'string', required: true },
        parent_id: { type: 'string', required: true },
        name: { type: 'string', required: true },
        path: { type: 'string', required: true },
        component_path: { type: 'string', required: true },
        description: { type: 'string', required: true },
        icon: { type: 'string', required: true },
        // redirect: { type: 'string', required: true },
        service: { type: 'string', required: true },
        title: { type: 'string', required: true },
    }
}