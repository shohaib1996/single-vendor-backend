export const getInvoiceEmailTemplate = (order: any, paymentStatus: string) => {
  const orderItems = order.orderItems
    .map(
      (item: any) => `
    <tr>
      <td>${item.product.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${(item.quantity * item.price).toFixed(2)}</td>
    </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #333;
          }
          .order-details,
          .billing-details {
            margin-bottom: 20px;
          }
          .order-details h2,
          .billing-details h2 {
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th,
          td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .total {
            text-align: right;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Invoice</h1>
          </div>
          <div class="order-details">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Status:</strong> ${paymentStatus}</p>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${orderItems}
              </tbody>
            </table>
            <div class="total">
              <h3>Total: ${order.total.toFixed(2)}</h3>
            </div>
          </div>
          <div class="billing-details">
            <h2>Billing Details</h2>
            <p>${order.user.name}</p>
            <p>${order.user.email}</p>
          </div>
          <div class="footer">
            <p>Thank you for your purchase!</p>
            <p>Your Company Name</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
