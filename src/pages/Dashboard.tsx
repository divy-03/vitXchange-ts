import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import data from "../assets/data.json";

const Dashboard = () => {
  return (
    <div className="adminContainer">
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <img
            src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            alt="user"
          />
        </div>
        <section className="widgetContainer">
          <WidgetItem
            percent={40}
            amount={true}
            value={340000}
            heading="Revenue"
            color="#7091e6"
          />
          <WidgetItem
            percent={-14}
            value={400}
            heading="Users"
            color="rgb(0 198 202)"
          />
          <WidgetItem
            percent={80}
            value={23000}
            heading="Transactions"
            color="rgb(255 196 0)"
          />
          <WidgetItem
            percent={30}
            value={1000}
            heading="Products"
            color="rgb(76 0 255)"
          />
        </section>

        <section className="graphContainer">
          <div className="revenueChart">
            <h2>Revenue & Transaction</h2>
            {/* Graph Here..... */}
          </div>
          <div className="dashboardCategories">
            <h2>Inventory</h2>
            <div>
              {data.categories.map((i) => (
                <Categoryitem
                  key={i.heading}
                  heading={i.heading}
                  stock={i.stock}
                  total={i.total}
                  color={`hsl(${i.stock/i.total * 400}, 100%, 50%)`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = (w: WidgetItemProps) => (
  <article className="widget">
    <div className="widgetInfo">
      <p>{w.heading}</p>
      <h4>{w.amount ? `$${w.value}` : w.value}</h4>
      {w.percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{w.percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {w.percent}%{" "}
        </span>
      )}
    </div>

    <div
      className="widgetCircle"
      style={{
        background: `conic-gradient(
        ${w.color} ${(Math.abs(w.percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color: w.color,
        }}
      >
        {w.percent}%
      </span>
    </div>
  </article>
);

interface CatItemProps {
  color: string;
  stock: number;
  total: number;
  heading: string;
}

const Categoryitem = ({ color, stock, total, heading }: CatItemProps) => (
  <div className="categoryItem">
    <h5>{heading}</h5>
    <div>
      <span>{stock}</span>
      <div>
        <div
          style={{ backgroundColor: color, width: `${(stock / total) * 100}%` }}
        ></div>
      </div>
      <span>{total}</span>
    </div>
  </div>
);

export default Dashboard;
