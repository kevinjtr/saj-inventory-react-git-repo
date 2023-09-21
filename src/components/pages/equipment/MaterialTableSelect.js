const MaterialTableSelect = React.forwardRef((t, i) => {
    const { columns, setColumns, toggleSwitch, setToggleSwitch, hras_array } = props
    const [openPopup,setOpenPopup] =  useState(false);
    const [selRowData, setSelRowData] = useState({});
    const [filteredDataRows, setFilteredDataRows] = useState([...equipments[i]]);

    const handleSearchChangeDirect = ({ data, searchText }) => setFilteredDataRows(prev => ({...prev, [i]: data}))

    return(
        <Box sx={{ paddingTop:'25px' }}>
        <UpdateStatusPopup openPopup={openPopup[i]} setOpenPopup={setOpenPopup}  handleUpdate={handleUpdate} rowData={selRowData[i]} setSnackBar={setSnackBar} equipments={{...equipments}}/>
        {!viewSwitch ? <MapWrapper equipments={[...filteredDataRows[0]]}/> : null}
            {rights.edit[tabs] ? 
                (<Grid container style={{paddingLeft:'20px', paddingTop:'10px', position:'absolute',zIndex:'200',width:'10%'}}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch color="primary" checked={toggleSwitch[i]} onChange={() => setToggleSwitch(prev => ({...prev, [i]: !prev[i] }))} name={`checkedView-${i}`} />}
                            label={toggleSwitch[i] ? "Extended View" : "Normal View"}
                        />
                    </FormGroup>
                </Grid>) : null}
                <EquipmentMuiTable

      equipmentArray={equipments[i]}
      employees={employees}
      condition={condition}
      hras_array={hras_array}
      edit_rights={rights.edit[i]}
      extended_view={toggleSwitch[i]}
      excess={i === 4}
      name={'Equipment'}
      componentName={'equipment'}
      showHistory={true}

      isLoading={loading}
      ref={ref}
      // components={{
      //   Action: (props, rowData) => {
      //     if (props.action.name === 'change-history') {
      //       return (
      //         <ChangeHistoryButton id={fetchKey ? props.data[fetchKey] : props.data.id} componentName={componentName}/>
      //       )
      //     }
          
      //     if(props.action.name === "export"){
      //         return (<div style={{paddingLeft: 10}}>
      //           <CustomExportButton {...{...ref?.current?.state, table: {name: 'equipment', viewType: toggleSwitch ? 'extended' : 'normal'}}}/>
      //         </div>)
      //     }

      //     if(props.action.name === "filter"){
      //       return (<div style={{paddingLeft: 10}}>
      //         <Button sx={{ height: 35, width: 150 }}
      //         startIcon={<FilterListIcon />}
      //         variant={showFilter ? 'outlined' : 'contained'}
      //         size="small"
      //         color="primary"
      //         onClick={() => {
      //           ref?.current?.dataManager?.columns?.forEach((item) => {
      //             if(item.type != 'date' && item?.tableData?.filterValue)
      //               ref.current?.onFilterChange(item?.tableData?.id, "");
      //           })
      //           setShowFilter(prev => !prev)
      //         }}
      //         >
      //           {showFilter ? 'Hide Filters' : 'Show Filters'}
      //         </Button>
      //       </div>)  
      //     }

      //     // if(props.action.tooltip === "Add" && !switches[tab_idx].checkedView){
      //     //   return <></>
      //     // }

      //     if (props.action.display === 'button' || (props.action.tooltip === "Add")) {
      //       const title = `${props.action.tooltip} ${name}`
      //       return (
      //         <div style={{paddingLeft: 10}}>
      //           <Button
      //           color={'success'}
      //           startIcon={<AddIcon />}
      //           {...props.action}
      //           onClick={(event) => props.action.onClick(event, props.data)}
      //           variant="contained"
      //           title={title}
      //         >{props.action.label || title}
      //         </Button>
      //       </div>
      //      )
      //     }

      //     return <MTableAction {...props} />;
      //   },
      // }}
      onOrderChange={() => handleSearchChangeDirect(ref.current.state)}
      onFilterChange={() => handleSearchChangeDirect(ref.current.state)}
      //onSearchChange={() => handleSearchChangeDirect(ref.current.state)}
      actions={[[0,1,2].includes(i) && {
        icon: AddCommentIcon,
        tooltip: 'Update Status',
        onClick: (event, rowData) => {
          setSelRowData(prev => ({...prev, [i]: rowData}))
          setOpenPopup(prev => ({...prev, [i]: true}))
        }
      }]}
    
      icons={tableIcons}
      //columns={[hra, status]}
      data={equipments[i]}
      options={{
        //filtering: showFilter,
        search: false,
          headerStyle: {
          backgroundColor: "#969696",
          color: "#FFF",
          fontWeight: 'bold',
          tableLayout: 'fixed'
      }
      }}
      title=""
      {...(rights.edit[tabs] && !initialLoad && {editable:{
          onRowAddCancelled: rowData => console.log('Row adding cancelled'),
          
          onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
          onRowAdd: async (newData) => {
          let errorFound = await handleAdd({changes:{'0':{newData:newData, oldData:null}}})

              return (new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if(errorFound){
                        reject();
                        return;
                    }

                    resolve();
                  }, 1000);
              }))
              },
          onRowUpdate: async (newData, oldData) => {
          let errorFound = await handleUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
              return (new Promise((resolve, reject) => {
                  setTimeout(() => {  
                    if(errorFound){
                        reject();
                        return;
                    }

                    resolve();
                  }, 1000);
              }))
          },
          // onRowDelete: async (newData, oldData) => {
          //   let errorFound = await handleDelete({changes:{'0':{newData:newData, oldData:oldData}}})
          //       return (new Promise((resolve, reject) => {
          //           setTimeout(() => {  
          //             if(errorFound){
          //                 reject();
          //                 return;
          //             }

          //             resolve();
          //           }, 1000);
          //       }))
          //   },

      }})}
     />
    </Box>
    )
  })