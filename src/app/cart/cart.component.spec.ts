import { CartComponent } from './cart.component';
import { of } from 'rxjs';

describe('CartComponent', () => {
    let component: CartComponent;
    let CART;
    let mockCartService;
    let mockCartCalculatorService;
    let mockRouter;

    beforeEach(() => {
        CART = [
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
            },
            {
                productId: 3,
                productName: 'bag of microwave Popcorn',
                productCategory: 'Popcorn',
                price: 0.99,
                isImported: false
            }
        ];

        mockCartService = jasmine.createSpyObj(['addToCart', 'getItems', 'clearCart']);
        mockCartCalculatorService = jasmine.createSpyObj(['calculateTotal', 'calculateTotalTax', 'calculateLineItemTaxes']);
        mockRouter = jasmine.createSpyObj(['navigate']);

        component = new CartComponent(mockCartService, mockCartCalculatorService, mockRouter);
    });

    describe('emptyCart', () => {
        it('should call clearCart', () => {
            mockCartService.clearCart.and.returnValue(true);
            mockRouter.navigate.and.returnValue(true);
            component.data = of(CART);

            component.emptyCart();

            expect(mockCartService.clearCart).toHaveBeenCalledTimes(1);
        });
    });
});
