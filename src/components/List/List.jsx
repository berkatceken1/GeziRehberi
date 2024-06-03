import React, { useState, useEffect, createRef } from "react";
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl,Select } from "@material-ui/core";

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());

        setElRefs(refs);
    }, [places]);



    return(
        <div className={classes.container}>
            <Typography variant="h4">Etrafınızdaki restoranlar, oteller ve turistik yerler</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel>Seçiniz</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restoranlar</MenuItem>
                    <MenuItem value="hotels">Oteller</MenuItem>
                    <MenuItem value="attractions">Turistik Yerler</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Puan</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>Hepsi</MenuItem>
                    <MenuItem value={3}>3.0 ve üzeri</MenuItem>
                    <MenuItem value={4}>4.0 ve üzeri</MenuItem>
                    <MenuItem value={4.5}>4.5 ve üzeri</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid item key={i} xs={12} >
                        <PlaceDetails 
                            place={place} 
                            selected={Number(childClicked) === i}
                            refProp={elRefs[i]}
                        />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    );
}

export default List;