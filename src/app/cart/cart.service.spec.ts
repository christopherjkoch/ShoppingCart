import { CartService } from './cart.service';

describe('CartService', () => {
    let service: CartService;

    beforeEach(() => {

    });

    it('should have no products to start', () => {
        service = new CartService();

        expect(service.items.length).toBe(0);
    });

    it('should add a product when add is called', () => {
        service = new CartService();

        service.addToCart(
            {
                productId: 1,
                productName: '16lb bag of Skittles',
                productCategory: 'Candy',
                price: 16.00,
                isImported: false
            }
        );

        expect(service.items.length).toBe(1);
    });

    it('should remove all products when clear is called', () => {
        service = new CartService();
        service.addToCart(
            {
                productId: 1,
                productName: '16lb bag of Skittles',
                productCategory: 'Candy',
                price: 16.00,
                isImported: false
            }
        );

        service.clearCart();

        expect(service.items.length).toBe(0);
    });

});
