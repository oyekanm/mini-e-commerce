import {
  useFlutterwave,
  FlutterWaveButton,
  closePaymentModal,
} from "flutterwave-react-v3";
import Button from "./daisyui/Button";
import { useRecoilState } from "recoil";
import { cartInfo } from "./state/CartState";

const Flutter = ({ onClose, price }) => {
  const [cartItem, setCartItem] = useRecoilState(cartInfo);
  const set = [...new Set(cartItem)];
  const config = {
    public_key: "FLWPUBK_TEST-aec90a66472c287512ed994086815fab-X",
    tx_ref: Date.now(),
    amount: price,
    currency: "NGN",
    payment_options: "mobilemoney,ussd",
    customer: {
      email: `user${Date.now()}@gmail.com`,
      phone_number: "070********",
      name: `john doe ${Date.now()}`,
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
  // https://sandbox-flw-web-v3.herokuapp.com/pay/j6c9tnsx6ex9
  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="w-full">
      {/* <h1>Hello Test user</h1> */}
      {/* <FlutterWaveButton className='block text-[2rem] font-bold cursor-pointer' {...fwConfig} /> */}
      <Button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              onClose()
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
        className="text-[1.8rem] font-semibold capitalize rounded-[1rem] w-full h-16"
      >
        checkout ({set.length})
      </Button>
      {/* <button
       className='block text-[2rem] font-bold cursor-pointer'
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button> */}
    </div>
  );
};

export default Flutter;
