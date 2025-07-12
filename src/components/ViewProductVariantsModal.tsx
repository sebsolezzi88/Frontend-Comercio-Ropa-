import type { Dispatch, SetStateAction } from "react";
import type { Product } from "../types/types"

interface ViewProductVariantsModalProps{
    productToViewVariants:Product | null;
    setIsViewVariantsModalOpen:Dispatch<SetStateAction<boolean>>;
    setProductToViewVariants:Dispatch<SetStateAction<Product | null>>;
}

const ViewProductVariantsModal = ({productToViewVariants,
    setIsViewVariantsModalOpen,setProductToViewVariants}:ViewProductVariantsModalProps) => {
  return (
    <div>ViewProductVariantsModal</div>
  )
}

export default ViewProductVariantsModal