import Image from "next/image";
import Actions from "./Actions";
import SearchInvoice from "./SearchInvoice";

const TABLE_HEAD_CTS_ITEMS = [
  "ID",
  "type",
  "Status",
  "Payment Status",
  "Fees amount",
  "Actions",
];

function InvoicesTable() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between py-4 px-3 bg-white dark:bg-gray-800">
        <Actions />
        <SearchInvoice />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            {TABLE_HEAD_CTS_ITEMS.map((item) => (
              <th key={item} scope="col" className="px-6 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <td scope="row" className="px-6 py-4">
              1
            </td>
            <td className="px-6 py-4">Subscription</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                <p> finalized</p>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                <p> succeeded</p>
              </div>
            </td>
            <td className="px-6 py-4">20 £</td>
            <td className="px-6 py-4 ">
              <button className="bg-green-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded flex gap-2 items-center ">
                Download
                <span className="inline-block">
                  <Image
                    src="/images/file.png"
                    alt="download-file"
                    width={20}
                    height={20}
                  />
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InvoicesTable;
