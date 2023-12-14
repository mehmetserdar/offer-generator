import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import logo from '../logo.png'; // Tell webpack this JS file uses this image

import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 792]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('teklif.pdf');
  });
}

class InvoiceModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <img src={logo} alt="Logo" width={280} />


                <h6 className="fw-bold text-secondary mb-1">
                  Teklif NO#: {this.props.info.invoiceNumber || ''}
                </h6>
              </div>
              <div className="text-end ms-4">
                <h6 className="fw-bold mt-1 mb-2">TEKLİFİN HAZIRLANDIĞI TARİH:</h6>
                <h5 className="fw-bold text-secondary"> {new Date().toLocaleDateString()}</h5>
              </div>
            </div>
            <div className="p-4">
              <Row className="mb-4">
                <Col md={4}>
                  <div className="fw-bold">ALICI:</div>
                  <div>{this.props.info.billTo || ''}</div>
                  <div>{this.props.info.billToAddress || ''}</div>
                  <div>{this.props.info.billToEmail || ''}</div>
                </Col>
                <Col md={4}>
                  <div className="fw-bold">HAZIRLAYAN:</div>
                  <div>{this.props.info.billFrom || ''}</div>
                  <div>{this.props.info.billFromAddress || ''}</div>
                  <div>{this.props.info.billFromEmail || ''}</div>
                </Col>
                <Col md={4}>
                  <div className="fw-bold">TEKLİF {this.props.info.dateOfIssue || ''} GÜN GEÇERLİDİR.</div>
                </Col>
              </Row>
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th>ÜRÜN - AÇIKLAMA</th>
                    <th>ADET</th>
                    <th className="text-end">FİYAT</th>
                    <th className="text-end">TUTAR</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.items.map((item, i) => {
                    const descriptionLines = item.description.split('\n');

                    return (
                      <tr id={i} key={i}>
                        <td>
                          <b>{item.name}</b>
                          {descriptionLines.map((line, index) => (
                            <div key={index}>{line}</div>
                          ))}
                        </td>
                        <td style={{ width: '50px' }}>{item.quantity}</td>
                        <td className="text-end" style={{ width: '100px' }}>
                          {this.props.currency} {item.price}
                        </td>
                        <td className="text-end" style={{ width: '100px' }}>
                          {this.props.currency} {(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>


              </Table>
              <Table>
                <tbody>
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: '100px' }}>ARA TOPLAM</td>
                    <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.subTotal}</td>
                  </tr>
                  {this.props.taxAmount != 0.00 &&
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: '100px' }}>VERGİ</td>
                      <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.taxAmount}</td>
                    </tr>
                  }
                  {this.props.discountAmount != 0.00 &&
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: '100px' }}>İSKONTO</td>
                      <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.discountAmount}</td>
                    </tr>
                  }
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: '100px' }}>TOPLAM TUTAR</td>
                    <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.total}</td>
                  </tr>
                </tbody>
              </Table>
              {this.props.info.notes && (
                <div className="bg-light py-3 px-4 rounded">
                  {this.props.info.notes.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              )}

            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>

              <Col md={12}>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
                  <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                  PDF İndir
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <hr className="mt-4 mb-3" />
      </div>
    )
  }
}

export default InvoiceModal;
