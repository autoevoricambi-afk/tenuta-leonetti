const unitPrice = 75;
const qtyInput = document.getElementById('qty');
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const totalPrice = document.getElementById('totalPrice');
const discountValue = document.getElementById('discountValue');
const whatsappOrder = document.getElementById('whatsappOrder');
const year = document.getElementById('year');

function formatEuro(value) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
}

function sanitizeQty(value) {
  const n = parseInt(value, 10);
  if (Number.isNaN(n) || n < 1) return 1;
  return n;
}

function updateOrder() {
  const qty = sanitizeQty(qtyInput.value);
  qtyInput.value = qty;
  const subtotal = qty * unitPrice;
  const discountRate = qty >= 5 ? 0.10 : 0;
  const total = subtotal * (1 - discountRate);
  totalPrice.textContent = formatEuro(total);
  discountValue.textContent = discountRate > 0 ? '10%' : 'Nessuno';
  const message = `Buongiorno Valerio Leonetti, vorrei ordinare ${qty} latta/e da 5 litri Tenuta Leonetti. Totale visualizzato sul sito: ${formatEuro(total)}.${discountRate > 0 ? ' È stato applicato lo sconto del 10%.' : ''}`;
  whatsappOrder.href = `https://wa.me/393273008506?text=${encodeURIComponent(message)}`;
}

minusBtn.addEventListener('click', () => {
  qtyInput.value = Math.max(1, sanitizeQty(qtyInput.value) - 1);
  updateOrder();
});

plusBtn.addEventListener('click', () => {
  qtyInput.value = sanitizeQty(qtyInput.value) + 1;
  updateOrder();
});

qtyInput.addEventListener('input', updateOrder);
year.textContent = new Date().getFullYear();
updateOrder();
