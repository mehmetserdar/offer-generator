import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

class InvoiceItem extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map(function (item) {
      return (
        <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={rowDel.bind(this)} key={item.id} currency={currency} />
      )
    });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ÜRÜN</th>
              <th>ADET</th>
              <th>FIYAT</th>
              <th className="text-center">İŞLEM</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>Ürün Ekle</Button>
      </div>
    );

  }

}
class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <tr>
        <td style={{ width: '100%' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "name",
              placeholder: "Ürün Adı",
              value: this.props.item.name,
              id: this.props.item.id,
            }} />
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "textarea", // Set type to "textarea" for a multi-line text area
              name: "description",
              placeholder: "Ürün Açıklaması",
              value: this.props.item.description,
              id: this.props.item.id,
              rows: 4, // Set the number of rows as needed
              cols: 50, // Set the number of columns as needed
            }}
          />

        </td>
        <td style={{ minWidth: '70px' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "number",
              name: "quantity",
              min: 1,
              step: "1",
              value: this.props.item.quantity,
              id: this.props.item.id,
            }} />
        </td>
        <td style={{ minWidth: '130px' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              leading: this.props.currency,
              type: "number",
              name: "price",
              min: 1,
              step: "0.01",
              presicion: 2,
              textAlign: "text-end",
              value: this.props.item.price,
              id: this.props.item.id,
            }} />
        </td>
        <td className="text-center" style={{ minWidth: '50px' }}>
          <BiTrash onClick={this.onDelEvent.bind(this)} style={{ height: '33px', width: '33px', padding: '7.5px' }} className="text-white mt-1 btn btn-danger" />
        </td>
      </tr>
    );

  }

}

export default InvoiceItem;