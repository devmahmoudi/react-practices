const Table = ({ headers, rows, footer }) => {
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

        {/* TABLE HEAD */}
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((head) => (
              <th scope="col" class="px-6 py-3 rounded-s-lg">
                {head}
              </th>
            ))}
          </tr>
        </thead>

        {/* TABLE BODY  */}
        <tbody>
          {rows.map((row) => (
            <tr class="bg-white dark:bg-gray-800">
              {row.map((index) => (
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* TABLE FOOTER  */}
        <tfoot>
          <tr class="font-semibold text-gray-900 dark:text-white">
            {footer.map((index) => (
              <th scope="row" class="px-6 py-3 text-base">
                {index}
              </th>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
