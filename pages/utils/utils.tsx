export const formatDataFunct = (
  dataElem: [
    {
      date: string;
      formatted_date: string;
      entry_word_count: string;
      quarter: string;
    }
  ]
) => {
  const diaryFormattedData = new Array();
  dataElem.forEach((d) => {
    let dObject = {
      id: Math.random(),
      date: d.date,
      entry_word_count: d.entry_word_count,
      formatted_date: new Date(d.formatted_date),
      month: new Date(d.formatted_date).getMonth(),
      year: new Date(d.formatted_date).getFullYear(),
      quarter: new Date(d.formatted_date).getFullYear(),
      week: new Date(d.formatted_date).getDay(),
      weekStacked: new Date(d.formatted_date).getDay(),
    };
    diaryFormattedData.push(dObject);
  });
  return diaryFormattedData;
};


export const dodge = (data:[any], selectedDateI: string, selectedValueI: string, xScaleI: any, rScaleI: any, paddingI:number, preRenderFun=false) => {



  const circles = data
    .map((d) => ({ x: xScaleI(d[selectedDateI]), r: rScaleI(d[selectedValueI]), data: d }))
    .sort((b, a) => b.data.formatted_date - a.data.formatted_date);

  const epsilon = 1e-3;
  let head: { x: number; y:number; r: number; data: any; next:any} | null = null,
    tail: any = null,
    queue = null;

  // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
  function intersects(x: number, y: number, r:number) {
    let a = head;
    while (a) {
      const radius2 = (a.r + r + paddingI) ** 2;
      if (radius2 - epsilon > (a.x - x) ** 2 + (a.y - y) ** 2) {
        return true;
      }
      a = a!.next;
    }
    return false;
  }

  //   // Place each circle sequentially.
  for (const b of circles as any) {

    // Choose the minimum non-intersecting tangent.
    if (intersects(b.x, (b.y = b.r ), b.r)) {
      let a = head;
      b.y = Infinity;
      do {
        let y =
          a!.y + Math.sqrt((a!.r + b.r + paddingI) ** 2 - (a!.x - b.x) ** 2);
        if (y < b.y && !intersects(b.x, y, b.r)) b.y = y;
        a = a!.next;
      } while (a);
    }

    //     // Add b to the queue.
    b.next = null ;
    if (head === null) {
      head = tail = b;
      queue = head;
    } else tail = tail.next = b;

    // console.log("Dodge Undefined:", selectedDateI, selectedValueI, b.x)

    // if (preRenderFun) {b.preRendered=preRenderFun(b.x, b.y,b.r)}
  }

  return circles;
};


export const isBrowser = () => typeof window !== "undefined";


