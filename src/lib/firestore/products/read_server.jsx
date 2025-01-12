import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export const getProduct = async({id}) => {
    const data = await getDoc(doc(db, `products/${id}`));
    if(data.exists()) {
        return data.data();
    }
    else {
        return null;
    }
}

export const getFeaturedProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), where("isFeatured", "==", true))
  );
  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      ...data,
      timestampCreate: data.timestampCreate.toDate().toISOString(), // Convert to ISO string
      timestampUpdate: data.timestampUpdate.toDate().toISOString(), // Convert to ISO string
    };
  });
};
