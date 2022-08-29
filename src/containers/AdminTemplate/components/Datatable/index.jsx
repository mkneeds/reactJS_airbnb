import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

// Material UI
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit, Search } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

// Style
import "./style.scss";

const Datatable = ({ title, columns, rows, loading, deleteRow }) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(deleteRow, {
        mutationKey: "users/delete",
        onSuccess: () => {
            queryClient.invalidateQueries(title);
        },
    });

    const handleDelete = (id) => {
        mutate(id);
    };

    const actionColumn = [
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.7,
            renderCell: (params) => (
                <div className="cell-actions">
                    <Tooltip title="Edit" placement="top" arrow>
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <IconButton className="cell-action btn-edit">
                                <Edit />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top" arrow>
                        <IconButton className="cell-action btn-delete" onClick={() => handleDelete(params.row._id)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="datatable-wrapper">
            <div className="datatable">
                <div className="top">
                    <div className="search">
                        <input type="text" placeholder="Search..." />
                        <Search />
                    </div>
                    <Link to="new" className="link">
                        <strong>+</strong> Add New
                    </Link>
                </div>
                <DataGrid
                    className="data-grid"
                    rows={rows}
                    columns={columns.concat(actionColumn)}
                    pageSize={6}
                    rowsPerPageOptions={[6, 15, 25]}
                    getRowId={(row) => row._id}
                    autoHeight
                    loading={loading}
                    headerHeight={45}
                    rowHeight={40}
                />
            </div>
        </div>
    );
};

export default Datatable;
