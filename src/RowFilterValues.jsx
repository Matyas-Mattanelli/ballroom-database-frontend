function RowFilterValues({valDict, handler, col, position}) {
    if (col !== null) {
        return (
            <div className='row-filter-values-container'  style={position}>
                {Object.entries(valDict).map(([val, isVisible], idx) => {
                    return (
                        <div key={idx} onClick={() => handler(col, val)} className="row-filter-option">{isVisible ? val + " \u2705" : val}</div>
                    )
                })}
            </div>
        )
    }
}

export default RowFilterValues;