import type { Dispatch, SetStateAction } from "react";
import type { Product } from "../types/types"

interface ViewProductVariantsModalProps{
    productToViewVariants:Product
    setIsViewVariantsModalOpen:Dispatch<SetStateAction<boolean>>;
    setProductToViewVariants:Dispatch<SetStateAction<Product | null>>;
}

const ViewProductVariantsModal = () => {
  return (
    <div>ViewProductVariantsModal</div>
  )
}

export default ViewProductVariantsModal