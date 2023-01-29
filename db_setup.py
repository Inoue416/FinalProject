import psycopg2
import setupDB_env as setup_env  # load env
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def make_db():
    # connecting databse
    conn = psycopg2.connect(
        dbname=setup_env.dbname,
        user=setup_env.user,
        password=setup_env.password,
        port=setup_env.port
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

    cur = conn.cursor()
    # getting cursor
    cur.execute(setup_env.makeDBSQL)  # make database
    conn.commit()
    cur.close()
    conn.close()

def make_table():
    # connecting databse
    conn = psycopg2.connect(
        dbname=setup_env.usedbname,
        user=setup_env.user,
        password=setup_env.password,
        port=setup_env.port
    )

    # getting cursor
    cur = conn.cursor()
    # making tables
    cur.execute(setup_env.createUsersSQL)
    cur.execute(setup_env.createThingsSQL)
    cur.execute(setup_env.createPointsSQL)
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    print("Setup database ...")
    make_db()
    make_table()
    print("fin.")
