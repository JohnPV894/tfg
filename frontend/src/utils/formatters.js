/**
 * Formatea un importe numérico en euros usando convención española.
 */
export function formatPrice(value) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return '—';

  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: numeric % 1 === 0 ? 0 : 2,
  }).format(numeric);
}

/**
 * Calcula el porcentaje de descuento visual cuando existe precio anterior mayor al actual.
 */
export function getDiscountPercentage(price, oldPrice) {
  const current = Number(price);
  const previous = Number(oldPrice);

  if (!previous || previous <= current || current <= 0) {
    return 0;
  }

  return Math.round(((previous - current) / previous) * 100);
}

/**
 * Devuelve la etiqueta visual de disponibilidad según el campo stock almacenado en MongoDB.
 */
export function getStockBadgeInfo(stock) {
  const units = Number(stock) || 0;

  if (units <= 0) {
    return {
      label: 'Sin stock temporal',
      variant: 'out',
    };
  }

  if (units <= 8) {
    return {
      label: `Últimas ${units} uds.`,
      variant: 'low',
    };
  }

  return {
    label: `En stock (${units} uds.)`,
    variant: 'in',
  };
}

