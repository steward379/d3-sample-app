function generateData() {
    const descriptions = ['Buy a car', 'Buy a cow', 'Buy drinks', 'Buy a bicycle', 'Pay a dinner', 'Buy a table'];
    const statuses = ['success', 'failed'];
    let data = [];
    for (let i = 0; i < 35; i++) {

      let randomAmount = Math.floor(Math.random() * (2000 - 5 + 1)) + 5;

      if (randomAmount > 100) {
        randomAmount = Math.round(randomAmount / 100) * 100;
      }

      data.push({
        dateCreated: generateRandomDate(new Date(2023, 3, 1), new Date(2023, 5, 31)),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        amount: `$${randomAmount.toLocaleString()}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
      });
    }
    return data;
  }
  
  function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
  
  export const mockData = generateData();
  