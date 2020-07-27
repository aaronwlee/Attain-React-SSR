import { React, MatUI, MenuIcon, ForwardIcon, useRouter } from "../deps.tsx";
const {
  AppBar,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} = MatUI as any;

export default function Layout({ children }: any) {
  const [open, setOpen] = React.useState(false);
  const { push } = useRouter()

  const routerConsts: any = {
    "/": "Home",
    "/data-fetching": "Data Fetching",
    "/style-guide": "Style Guide",
    "/dynamic/1": "Dynamic Routing"
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              style={{ marginRight: 8 }}
              edge="start"
              aria-label="menu"
              onClick={() => setOpen(true)}
            >
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6">
              Attain-React
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid style={{ marginTop: 60 }} item xs={12}>
        {children}
      </Grid>

      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            width: 250
          }}
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <List>
            {
              Object.keys(routerConsts).map((key, index) => (
                <ListItem key={index} button onClick={() => push(key)}>
                  <ListItemIcon>
                    <ForwardIcon />
                  </ListItemIcon>

                  <ListItemText primary={routerConsts[key]} />
                </ListItem>
              ))
            }
          </List>
        </div>
      </Drawer>
    </Grid >
  );
}
