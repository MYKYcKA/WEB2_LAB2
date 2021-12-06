'use strict'

const pierModel = new Pier() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#pier-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const pierData = {}
        formData.forEach((value, key) => {
            pierData[key] = value
        })

        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            pierModel.Update(pierData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            pierModel.Create(pierData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#pier-list').DataTable({
        data: pierModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Port', data: 'port' },
            { title: 'Number', data: 'number' },
            { title: 'Capacity', data: 'capacity' },
            { title: 'Action', data: '' }
        ],
        columnDefs: [
            {
                "render": function(data, type, row) {
                    return ''
                        + '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>'
                        + "\n"
                        + '<button type="button" value="update" onclick="updateItem(this)">Update</button>';
                },
                "targets": 4
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('piersListDataChanged', function (e) {
        const dataTable = window.jQuery('#pier-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    pierModel.Delete(id);
}

function updateItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    let obj = pierModel.FindById(parseInt(id));
    document.getElementById('port').value = obj.port;
    document.getElementById('number').value = obj.number;
    document.getElementById('capacity').value = obj.capacity;
    let createButton = document.getElementById('btn-create');
    let updateButton = document.getElementById('btn-update');
    createButton.classList.add('btn-hidden');
    updateButton.classList.remove('btn-hidden');
    let hiddenInput = document.getElementById('update-item');
    hiddenInput.value = obj.id;
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
