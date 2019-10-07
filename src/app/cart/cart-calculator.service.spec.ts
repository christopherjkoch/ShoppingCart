import { CartCalculatorService } from './cart-calculator.service';

describe('CartCalculatorService', () => {
    let service: CartCalculatorService;

    beforeEach(() => {

    });

    it('should calculate cart total correctly', () => {
        service = new CartCalculatorService();

        const cart = [
            {
                productId: 1,
                productName: '16lb bag of Skittles',
                productCategory: 'Candy',
                price: 16.00,
                isImported: false
            },
            {
                productId: 2,
                productName: 'Walkman',
                productCategory: 'Electronics',
                price: 99.99,
                isImported: false
            }
        ];

        const total = service.calculateTotal(cart);

        expect(total).toBe(115.99);
    });

    it('should calculate line item import tax correctly', () => {
        service = new CartCalculatorService();

        const cart = [
            {
                productId: 5,
                productName: 'Imported Vespa',
                productCategory: 'Scooter',
                price: 15001.25,
                isImported: true
            }
        ];

        const cartIncludingTaxes = service.calculateLineItemTaxes(cart);

        expect(cartIncludingTaxes[0].price).toBe(17251.5);
    });

    it('should calculate line item sales tax correctly', () => {
        service = new CartCalculatorService();

        const cart = [
            {
                productId: 2,
                productName: 'Walkman',
                productCategory: 'Electronics',
                price: 99.99,
                isImported: false
            }
        ];

        const cartIncludingTaxes = service.calculateLineItemTaxes(cart);

        expect(cartIncludingTaxes[0].price).toBe(109.99);
    });

    it('should not include exempt items in sales tax calculation', () => {
        service = new CartCalculatorService();

        const cart = [
            {
                productId: 1,
                productName: '16lb bag of Skittles',
                productCategory: 'Candy',
                price: 16.00,
                isImported: false
              }
        ];

        const cartIncludingTaxes = service.calculateLineItemTaxes(cart);

        expect(cartIncludingTaxes[0].price).toBe(16.00);
    });

    it('should calculate cart total tax correctly', () => {
        service = new CartCalculatorService();

        const cart = [
            {
                productId: 6,
                productName: 'imported crate of Almond Snickers',
                productCategory: 'Candy',
                price: 75.99,
                isImported: true
              },
              {
                productId: 7,
                productName: 'Discman',
                productCategory: 'Electronics',
                price: 55.00,
                isImported: false
              },
              {
                productId: 8,
                productName: 'Imported Bottle of Wine',
                productCategory: 'Alcohol',
                price: 10.00,
                isImported: true
              },
              {
                productId: 9,
                productName: '300# bag of Fair-Trade Coffee',
                productCategory: 'Coffee',
                price: 997.99,
                isImported: false
              }
        ];

        const totalTax = service.calculateTotalTax(cart);

        expect(totalTax).toBe(10.8);
    });



});
